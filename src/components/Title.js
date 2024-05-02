// dieter whittingham
// april 22 2024
// Title.js

// page title component

/**
 *
 * @param props.text title text
 */
function Title(props) {
    return (
        <div
            className="text-6xl my-[3%] font-normal animate-in fade-in
            slide-in-from-top ease-in-out duration-1000"
        >
            {props.text}
        </div>
    );
}

export default Title;
