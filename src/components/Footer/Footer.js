import "./style.css"

export default function Footer({children, img, title}){
    return(
        <div className="footer">
            <div className="img-container"><img src={img} alt={title} /></div>
            <div className="title">
                {title} <br/>
                {children}
            </div>
        </div>
    );
}