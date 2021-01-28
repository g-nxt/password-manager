import React from "react";
import classes from "./Footer.module.css"
import footerImage from "../Icons/footer-graphic.png";

const Footer = () => {

    return (
        <div>
            <div className={classes.Footer}>
                {/*<h1>Test Footer</h1>*/}

                <input type="image" src={footerImage} className={classes.Image} alt="" title="Delete"/>
            </div>
            {/*<div className={classes.Footer1}>
                <input type="image" src={footerImage} className={classes.Image} alt="" title="Delete"/>
            </div>
            <div className={classes.Footer3}>
                <input type="image" src={footerImage} className={classes.Image} alt="" title="Delete"/>
            </div>
            <div className={classes.Footer4}>
                <input type="image" src={footerImage} className={classes.Image} alt="" title="Delete"/>
            </div>*/}
        </div>
    );

}

export default Footer;