import "./style.css";

export default function InnerHeader({text , ...otherProps}){
    return(
        <div className={"inner-screen-header "+ otherProps.color}>
                {text}
        </div>
    );
}