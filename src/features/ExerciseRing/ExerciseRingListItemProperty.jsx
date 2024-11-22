import {LinearProgress, Typography} from "@mui/material";

function ExerciseRingListItemProperty({exerciseRing, label, property}) {

    return (
        <>
            <Typography variant="body1">
                {label}: {exerciseRing.fields.value[property]} / {exerciseRing.goal.fields.value[property]}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={exerciseRing.fields.progress[property]}
            />
        </>
    )
}

export default ExerciseRingListItemProperty;