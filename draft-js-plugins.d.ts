/// <resources type="react" />
/// <resources type="draft-js" />

declare module 'draft-js-plugins-editor' {
  export type PluginsEditorProps =
    | Draft.EditorProps
    | {
        plugins: any;
      };

  export default class PluginsEditor extends React.Component<
    PluginsEditorProps,
    Draft.EditorState
  > {}
  export function createEditorStateWithText(text: string): PluginsEditor;
  export function composeDecorators(...func: any[]): (...args: any[]) => any;
}

// @todo flesh out component type
declare module 'draft-js-emoji-plugin' {
  function createEmojiPlugin(config?: object): any;
  export type EmojiSuggestions = any;
  export default createEmojiPlugin;
}

declare module 'draft-js-mention-plugin' {
  // @todo missing defaultTheme
  // @todo missing defaultSuggestionsFilter

  interface Props {
    suggestions: any[];
    onAddMention: (mention: any) => void;
    entryComponent: (...props: any[]) => JSX.Element;
    entityMutability: string;
  }

  interface State {
    isActive: boolean;
    focusedOptionIndex: number;
  }

  export type MentionSuggestions<T> = React.Component<Props, State>;
  export default function createMentionPlugin(config?: object): any;
}
