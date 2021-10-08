import React from 'react';
import SearchBar from './components/SearchBar';
import StandardTable from './components/StandardTable';
import Toolbar from './components/Toolbar';
import ComplexTable from './components/ComplexTable';

let index: any = ComplexTable;
index.Toolbar = Toolbar;
index.SearchBar = SearchBar;
index.StandardTable = StandardTable;
export default index;
