export default function Notification({ message, display, bgColor }) {
    return (
        <div className="notification" style={{ display, backgroundColor: bgColor }}>
            <span>{message}</span>
        </div>
    );
}