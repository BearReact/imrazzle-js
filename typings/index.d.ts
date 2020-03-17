declare module '*.svg' {
    const content: any;
    export default content;
}

declare module "@storybook/addon-console" {
    export function withConsole(): any;
}

declare module '*.md' {
    const content: string;
    export = content;
}
