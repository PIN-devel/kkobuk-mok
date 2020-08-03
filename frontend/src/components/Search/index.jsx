import React, { useState, useContext } from "react";

import { Grid, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Wrapper from "./styles";

// import { SearchContext } from "../../contexts/SearchContext";

const SearchComponent = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  // const { searchData, setSearchData } = useContext(SearchContext);
  const { searchData, setSearchData } = props;

  console.log("검색 컴포 렌더");

  const implSearch = (e) => {
    setSearchData(searchValue);
    // setSearchData(textData);
  };

  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className="search-component-grid"
      >
        <Grid item>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={3}>
              <SearchIcon
                className="search-component-grid-item-se-icon"
                fontSize="large"
                onClick={implSearch}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                value={searchValue}
                placeholder="Search..."
                autoFocus={true}
                onChange={onSearchValue}
                className="input2"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;

// import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import { Paper, Input } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     borderRadius: "4px",
//     alignItems: "center",
//     padding: theme.spacing(1),
//     display: "flex",
//     flexBasis: 420,
//   },
//   icon: {
//     marginRight: theme.spacing(1),
//     color: theme.palette.text.secondary,
//   },
//   input: {
//     flexGrow: 1,
//     fontSize: "14px",
//     lineHeight: "16px",
//     letterSpacing: "-0.05px",
//   },
// }));

// const SearchComponent = (props) => {
//   const { className, onChange, style, ...rest } = props;

//   const classes = useStyles();

//   return (
//     <Paper {...rest} className={clsx(classes.root, className)} style={style}>
//       <SearchIcon className={classes.icon} />
//       <Input
//         {...rest}
//         className={classes.input}
//         disableUnderline
//         onChange={onChange}
//       />
//     </Paper>
//   );
// };

// SearchComponent.propTypes = {
//   className: PropTypes.string,
//   onChange: PropTypes.func,
//   style: PropTypes.object,
// };

// export default SearchComponent;
