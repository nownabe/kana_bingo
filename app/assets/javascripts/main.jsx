import React from "react";
import $ from "jquery"

import Endpoint from "./Endpoint"
import KanaTable from "./KanaTable"

const TableCell = React.createClass({
  onClick(event) {
    let method = this.props.state ? "DELETE" : "POST";
    $.ajax({
      url: Endpoint.char(this.props.char),
      type: method,
      data: {}
    });
  },

  render() {
    let styleClass;
    if (this.props.state != null)
      styleClass = this.props.state ? "open" : "closed";
    else
      styleClass = "dummy";

    return(
      <td onClick={this.onClick} className={styleClass}>{this.props.char}</td>
    )
  }
});

const TableRow = React.createClass({
  render() {
    let cells = this.props.row.map((cell) => {
      if (cell)
        for (let key in cell) return(<TableCell char={key} state={cell[key]} />);
      else
        return(<TableCell char={null} />);
    });
    return(
      <tr>{cells}</tr>
    )
  }
});

const Table = React.createClass({
  render() {
    let rows = [];
    if (this.props.table)
      rows = this.props.table.map((row) => {
        return(<TableRow row={row} />);
      });

    return(
      <table id="kana-table">
        {rows}
      </table>
    )
  }
});

const KanaBingo = React.createClass({
  getTable() {
    $.ajax({
      url: Endpoint.table(),
      dataType: "json",
      cache: false,
      success: (data) => {
        this.setState({table: new KanaTable(data)})
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    JSON.stringify(this.state.table.formattedTable);
  },

  getInitialState() {
    return {
      table: []
    };
  },

  handleChange(event) {
    this.setState({
      table: event.target.value
    });
  },

  componentDidMount() {
    this.getTable();
    setInterval(this.getTable, this.props.pollInterval);
  },

  render() {
    return(
      <Table table={this.state.table.formattedTable} />
    );
  }
});

React.render(
  <KanaBingo pollInterval={500} />,
  document.getElementById("bingo-container")
);
