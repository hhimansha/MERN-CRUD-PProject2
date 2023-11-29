import { useEffect, useState } from 'react';

//components
import WorkoutDetails from '../components/workoutDetails';

const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key = {workout._id} workout = {workout}/>
                    ))}
            </div>
        </div>
    );
};

export default Home;
