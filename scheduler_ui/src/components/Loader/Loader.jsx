import React from 'react';
import cl from "./Loader.module.css"

const Loader = () => {
    return (
        <div>
            <div className={cl.loader}>

            </div>
            Loading ...
        </div>

    );
};

export default Loader;