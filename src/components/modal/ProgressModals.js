import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useProgress } from '../../contexts/ProgressContext';
import ProgressModal from './ProgresModal';

const ProgressModals = () => {
    const { process } = useProgress();
    const isConnected = useSelector(state => state.socket.resetProcess);
    console.log(process, 'isConnected from ProgressModals,', isConnected, 'isConnected from ProgressModals', !isConnected);
    return (
        <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={2}
            sx={{
                position: "fixed",
                bottom: "20px",
                right: "5px",
                zIndex: 9999,
            }}
        >
            {Object.entries(process).map(([videoId, videoProcess]) =>
                Object.entries(videoProcess).map(
                    ([name, process]) =>
                        //     if (process.status === "processing" && Object.keys(isConnected).length === 0) {
                        //         console.log('ProgressModals', process);
                        //         // ...
                        //     }
                        // }
                        (process.status === "processing" && !isConnected) && (
                            <ProgressModal
                                key={`${videoId}-${name}`}
                                name={name}
                                fileName={process.fileName}
                                status={process.status}
                                progress={process.progress}
                            />

                        )
                )
            )}
        </Stack>
    );
};


export default ProgressModals;