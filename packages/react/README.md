# react

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test react` to execute the unit tests via [Jest](https://jestjs.io).

## Building Project

Run `nx build react` to build project. [Doc](https://nx.dev/react/overview)

## Publishing Project

[Doc](https://nx.dev/structure/buildable-and-publishable-libraries)

## Creating Component

Components
`nx g component ${my-component} --project=react --directory=components --R --fileName=index`

Widgets
`nx g component ${my-component} --project=react --directory=widgets --R --fileName=index`

[Doc](https://nx.dev/packages/react/generators/component)

## Creating Component Story

`nx g component-story --project=react --componentPath=components/${my-component}/index.tsx`

[Doc](https://nx.dev/packages/react/generators/component-story)

## run storybook

`nx run react:storybook`

[Doc](https://nx.dev/storybook/overview-react)

## Creating Hook

`nx g hook hook-name --project=react --directory=hooks --P --flat`

[Doc](https://nx.dev/packages/react/generators/hook)
