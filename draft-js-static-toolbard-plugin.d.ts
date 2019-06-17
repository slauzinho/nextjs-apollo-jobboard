/// <resources type="react" />
/// <resources type="draft-js" />

declare module 'draft-js-static-toolbar-plugin' {
  export function createToolbarPlugin(text: string): PluginsEditor;
}
