export default function ErrorMessage({ message = 'Something went wrong.' }) {
    return (
        <div className="error-message" role="alert">
            <p>😕 {message}</p>
        </div>
    );
}