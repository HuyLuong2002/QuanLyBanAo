import './Loader.scss';

const Loader = ({ min_height }) => {
    return (
        <div className={min_height ? `${min_height}` : "loading"}>
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
