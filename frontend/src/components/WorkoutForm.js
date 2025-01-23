import { useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import '../components/Styles/WorkoutForm.css';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyBlanks, setemptyBlanks] = useState([]);
    const [isVisible, setIsVisible] = useState(false); // New state for toggling visibility

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const workout = { title, load, reps };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setemptyBlanks(json.emptyBlanks);
        }
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setemptyBlanks([]);
            console.log('new workout added', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    return (
        <div className="workout-form-container">
            <button
                className="toggle-button"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? 'Close Form' : 'Add Workout'}
            </button>
            {isVisible && (
                <form className="create" onSubmit={handleSubmit}>
                    <h3>Add a Workout</h3>

                    <label>Exercise Title</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className={emptyBlanks.includes('title') ? 'error' : ''}
                        placeholder="e.g., Bench Press"
                        required
                    />

                    <label>Load (in kg): </label>
                    <input
                        type="number"
                        onChange={(e) => setLoad(e.target.value)}
                        value={load}
                        className={emptyBlanks.includes('load') ? 'error' : ''}
                    />

                    <label>Reps: </label>
                    <input
                        type="number"
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                        className={emptyBlanks.includes('reps') ? 'error' : ''}
                    />

                    <button>Add Workout</button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default WorkoutForm;
