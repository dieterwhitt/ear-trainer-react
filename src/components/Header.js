// dieter whittingham
// april 22 2024
// header component

/**
 * @param props.text header text
 */
function Header(props) {
    return (
        <div
            className="text-3xl mb-[2%] mx-[15%] font-normal animate-in fade-in
            slide-in-from-top ease-in-out duration-1000 leading-snug"
        >
            {props.text}
        </div>
    );
}

export default Header;
