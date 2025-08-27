import axios from 'axios';
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store?.connection);
    console.log("The connections are as follow", connections);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connections", { withCredentials: true });
            console.log("res from the connection list is", res.data);
            dispatch(addConnection(res.data));
        } catch (error) {
            console.log("Error while fetching connections", error.message);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections.length === 0) {
        return <p>Loading connections...</p>;
    }

    return (
        <>
            {connections.map((conn) => (
                <div
                    key={conn.id}
                    className="bg-base-300 shadow-sm w-1/2 mx-auto my-5 flex items-start rounded-2xl"
                >
                    <img
                        className="w-1/2 h-64 object-fit rounded-2xl"
                        src={conn.photoUrl}
                        alt={conn.firstName + " " + conn.lastName}
                    />
                    <div className="card-body">
                        <h2 className="card-title">{conn.firstName + " " + conn.lastName}</h2>
                        <p>{conn.age + " " + conn.gender}</p>
                        <p>{conn.talent}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Connections