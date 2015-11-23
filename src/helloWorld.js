var ProductRow = React.createClass({
    render: function() {

return (
    <tr>
    <td>{this.props.product.globalbookid}</td>
    <td>{this.props.product.authors[0].firstname} {this.props.product.authors[0].lastname}</td>
    <td>{this.props.product.librarysupported}</td>
    <td>{this.props.product.title}</td>
</tr>
);
}
});

var ProductTable = React.createClass({

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
            if (product.title.indexOf(this.props.filterText) === -1 || (( !product.librarysupported|| product.librarysupported<1) && this.props.inStockOnly)) {
                return;
            }
    rows.push(<ProductRow product={product} key={product.globalbookid} />);
}.bind(this));

return (
    <table>
    <thead>
    <tr>
    <th>Book Id</th>
    <th>Author</th>
    <th>Library</th>
    <th>Title</th>
    </tr>
    </thead>
    <tbody>{rows}</tbody>
    </table>
);
}
});

var SearchBar = React.createClass({
    handleChange: function() {
    this.props.onUserInput(
        this.refs.filterTextInput.value,
        this.refs.inStockOnlyInput.checked
    );
},
render: function() {
    return (
        <form>
        <input
    type="text"
    placeholder="Search..."
    value={this.props.filterText}
ref="filterTextInput"
onChange={this.handleChange}
/>
<p>
<input
type="checkbox"
checked={this.props.inStockOnly}
ref="inStockOnlyInput"
onChange={this.handleChange}
/>
{' '}
Only show library supported books
</p>
</form>
);
}
});

var FilterableProductTable = React.createClass({
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
        <div>
        <SearchBar
    filterText={this.state.filterText}
inStockOnly={this.state.inStockOnly}
onUserInput={this.handleUserInput}
/>
<ProductTable
books={this.props.books}
filterText={this.state.filterText}
inStockOnly={this.state.inStockOnly}
/>
</div>
);
}
});


ReactDOM.render(
<FilterableProductTable books="data/searchbook.json" />,
    document.getElementById('example')
);
