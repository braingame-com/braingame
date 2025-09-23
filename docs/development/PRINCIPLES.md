# Development principles

## - All apps should use components from BGUI, the single source of truth.
We should never custom code unique components inside apps, everything should be imported.
We don't have to document everything insiude BGUI, for example a component that's only used in an obscure screen somewhere etc. but we should still house that component within BGUI. This is the source of truth, the component library, the toolbox.

## - Components should use React Native, even if they'll only ever be used on the web.
This is so we have a consistent development framework to use. We should think in React Native, and it should be the only language we ever write in. No normal React files, no CSS files etc., just pure React Native, which we'll render on web using React Native for web. This helps us minimize deciosion making and gives us one universal language.

## - Avoid dual component patterns at the file level.
Never ever use .web.tsx or .native.tsx files at all - it just creates more maintainence overhead and is almost always not warranted. If you really need some platform differences, which do sometimes occur, prefer using conditional statements within a component, rather than two different components.

## - Keep code clean!
We want sensible, readible, modular, short code. We do not want huge files that no one can read or understand.