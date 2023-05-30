import { Grid } from "semantic-ui-react"

export default function home() {
  return (
    <Grid centered padded verticalAlign='middle' columns={1} style={{height: "80vh" }}>
        <Grid.Row>
            <Grid.Column textAlign='centered'>
                <h1>Seleccione una opcion de la barra de tareas</h1>
                <img src='https://cdn.icon-icons.com/icons2/689/PNG/512/android_robot_mobile_mood_emoji_sad_tear_icon-icons.com_61433.png'/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  )
}
