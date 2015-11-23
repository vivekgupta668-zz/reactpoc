var ProductRow = React.createClass({displayName: "ProductRow",
    render: function() {

return (
    React.createElement("tr", null, 
    React.createElement("td", null, this.props.product.globalbookid), 
    React.createElement("td", null, this.props.product.authors[0].firstname, " ", this.props.product.authors[0].lastname), 
    React.createElement("td", null, this.props.product.librarysupported), 
    React.createElement("td", null, this.props.product.title)
)
);
}
});

var ProductTable = React.createClass({displayName: "ProductTable",

    getInitialState: function() {
        return {
            data: []
          };
    },

    componentDidMount: function(){
        $.get(this.props.books, function(result) {
            console.log(result);
            if (this.isMounted()) {
                this.setState({
                    data:result.books
                });
            }
        }.bind(this));
    },


    render: function() {
        var rows = [];
        var lastCategory = null;
        this.state.data.forEach(function(product) {
            if (product.title.indexOf(this.props.filterText) === -1 || (product.librarysupported<1 && this.props.inStockOnly)) {
                return;
            }
    rows.push(React.createElement(ProductRow, {product: product, key: product.globalbookid}));
}.bind(this));

return (
    React.createElement("table", null, 
    React.createElement("thead", null, 
    React.createElement("tr", null, 
    React.createElement("th", null, "Book Id"), 
    React.createElement("th", null, "Author"), 
    React.createElement("th", null, "Library"), 
    React.createElement("th", null, "Title")
    )
    ), 
    React.createElement("tbody", null, rows)
    )
);
}
});

var SearchBar = React.createClass({displayName: "SearchBar",
    handleChange: function() {
    this.props.onUserInput(
        this.refs.filterTextInput.value,
        this.refs.inStockOnlyInput.checked
    );
},
render: function() {
    return (
        React.createElement("form", null, 
        React.createElement("input", {
    type: "text", 
    placeholder: "Search...", 
    value: this.props.filterText, 
ref: "filterTextInput", 
onChange: this.handleChange}
), 
React.createElement("p", null, 
React.createElement("input", {
type: "checkbox", 
checked: this.props.inStockOnly, 
ref: "inStockOnlyInput", 
onChange: this.handleChange}
), 
' ', 
"Only show library supported books"
)
)
);
}
});

var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
    getInitialState: function() {
    return {
        filterText: '',
        inStockOnly: false
    };
},

handleUserInput: function(filterText, inStockOnly) {
    this.setState({
        filterText: filterText,
        inStockOnly: inStockOnly
    });
},

render: function() {
    return (
        React.createElement("div", null, 
        React.createElement(SearchBar, {
    filterText: this.state.filterText, 
inStockOnly: this.state.inStockOnly, 
onUserInput: this.handleUserInput}
), 
React.createElement(ProductTable, {
books: this.props.books, 
filterText: this.state.filterText, 
inStockOnly: this.state.inStockOnly}
)
)
);
}
});





var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
React.createElement(FilterableProductTable, {books: "data/searchbook.json"}),
    document.getElementById('example')
);
