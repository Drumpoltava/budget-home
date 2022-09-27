# React HomeBudget App Task 🏠🧮📈

The task is to implement small home budget app that will allow to track income/outcome transactions. 
The app should be written using the technologies mentioned in the **[Technologies](#technologies)** section.

## Technologies

- Typescript/Javascript
- `React` version `16.8 and up`, please make sure to use Hooks and Functional components
- `Redux` or `Redux-Toolkit` version compatible with React version
- `Any UI library` for quick scaffolding (Reactstrap/React Bootstrap etc.)
- Use `localStorage` as a DB for the app
- Implement asynchronous layer that will load data from `localStorage` with `Redux-Thunk` or `Redux-Saga`

## Data layer

There are two models in the app: 
1. ### `Category` 
> Represents one category of transaction. There must be pre-defined categories in the app from the beginning (3 is enough). As examples of categories: `Salary`, `Food`, `Going out`. 

```
//  Should have following fields: 
{ 
    id: Number|String, 
    name: String
} 
```

2. ### `Transaction`
> Represents transaction.

```
// Should have following fields: `
{ 
    id: Number|String, 
    name: String,
    date: Date,
    amount: Number, (where `positive` value means income and `negative` value means outcome )
    categoryId: Number|String, (reference by category id)
}
```

## Pages

### Budget
This is default page and app entry point that will represent 2-column layout:
- `First column` - List of categories with the ability to add/remove categories
- `Second column` - Should have a form for adding a new positive/negative transaction by category. Under the form should be a list of transactions

> Note: When the category gets deleted you need to move all transactions of category into `Archived Transactions` list

## Example of UI Presentation
![wireframe](https://user-images.githubusercontent.com/1899626/167616466-3539e35b-9cce-4877-b64a-a3f4d156aa3c.png)

## How to start

1. Fork this repository
2. Complete the task in your repository
3. Create a PR to this repository


### Happy coding! 🚀