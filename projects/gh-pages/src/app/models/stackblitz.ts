export interface StackblitzSettings {
  projectId: string;
  opts?: {
    file?: string; // Show a specific file on page load
    embed?: true; // Open in new window or in current window
    hideExplorer?: boolean; // Hide the debugging console
    hideNavigation?: boolean; // Set the height of the debugging console
    ctl?: boolean; // Set the height of the debugging console
    view?: 'editor' | 'preview'; // Set the height of the debugging console
    hidedevtools?: boolean; // Set the height of the debugging console
    devtoolsheight?: number; // Set the height of the debugging console
  };
}
