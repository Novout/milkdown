import { createNode, NodeParserSpec, NodeSerializerSpec } from '@milkdown/core';
import type { NodeSpec } from 'prosemirror-model';
import { BaseNode } from '@milkdown/utils';

export const doc = createNode({
    id: 'doc',
    schema: {
        content: 'block+',
    },
    parser: {
        match: ({ type }) => type === 'root',
        runner: (state, node, type) => {
            state.injectRoot(node, type);
        },
    },
    serializer: {
        match: (node) => node.type.name === 'doc',
        runner: (state, node) => {
            state.openNode('root');
            state.next(node.content);
        },
    },
});
