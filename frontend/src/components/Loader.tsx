import { useState, CSSProperties } from "react";
import GridLoader from "react-spinners/GridLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple",
};

function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#7e22ce");

    return (
        <GridLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    );
}

export default Loader;
