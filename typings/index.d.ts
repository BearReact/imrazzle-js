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

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (
        paths: string[],
        callback: (require: <T>(path: string) => T) => void
    ) => void;
};
