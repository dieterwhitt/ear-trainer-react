// dieter whittingham
// april 23 2024
// generic button component

/**
 * generic blue/grey scaling button component
 * @param props.text button text
 * @param props.enabled whether button is enabled
 * @param props.onClick callback function upon click
 * @param props.py y padding adjustment (percentage)
 * @param props.px x padding adjustment (percentage)
 * @param props.size text size
 */
function GenericButton1(props) {
    console.log("loading button");
    var styleStr = "";
    if (props.enabled) {
        styleStr =
            "bg-indigo-200 outline-indigo-400 hover:bg-indigo-300 " +
            "hover:scale-110 duration-300 ";
    } else {
        styleStr = "bg-gray-300 outline-gray-400 ";
    }
    // april 24 2024 - x padding bugging out for some reason
    // band aid fix need to fix later
    styleStr +=
        "font-normal outline rounded-full " +
        "h-fit px-[3%] outline-2 outline-offset-2 ";
    // padding adjustments
    // default x-3% y-1.5%
    if (props.py) {
        styleStr += `py-[${props.py}%] `;
    } else {
        styleStr += "py-[1.5%] ";
    }
    if (props.px) {
        styleStr += `px-[${props.px}%] `;
    } else {
        styleStr += "px-[3%] ";
    }
    // check text size
    if (props.size) {
        styleStr += `text-${props.size} `;
    } else {
        styleStr += "text-3xl ";
    }
    console.log(styleStr);
    // construct button
    return (
        <button
            className={styleStr}
            onClick={props.onClick}
            disabled={!props.enabled}
        >
            {props.text}
        </button>
    );
}

export default GenericButton1;
