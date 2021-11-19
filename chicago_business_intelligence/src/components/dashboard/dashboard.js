import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CoronaImage from '../../images/CoronaVirus.png';
import TaxiImage from '../../images/taxi.png'

const DashBoard = () => {
    const cards = [
        {
          header: 'Covid Reports',
          info: 'The business intelligence reports are geared toward' +
          'tracking and forecasting events that have direct or indirect impacts on' + 
          'businesses and neighborhoods in different zip codes within the city of' +
          'Chicago. The business intelligence reports will be used to send alerts to taxi' +
          'drivers about the state of COVID-19 in the different zip codes in order to' + 
          'avoid taxi drivers to be the super spreaders in the different zip codes and' +
          'neighborhoods. For this report, we will use taxi trips and daily COVID-19' +
          'datasets for the city of Chicago.',
          image: CoronaImage
        },
        {
          header: 'Taxi Trips Information',
          info: 'There are two major airports within the city of Chicago:' +
          'O’Hare and Midway. And we are interested to track trips from these airports' +
          'to the different zip codes and the reported COVID-19 positive test cases.' +
          'The city of Chicago is interested to monitor the traffic of the taxi trips from' +
          'these airports to the different neighborhoods and zip codes.',
          image: TaxiImage
        }
    ];

    return (
        <>
        <Box sx={{display: 'flex'}}>
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Chicago Business Intelligence
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                Our motive is to provide information about city of chicago which help
                community to grow and fight againts the evil of today.
                </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.header} xs={12} sm={12} md={6}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image={card.image}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.header}
                  </Typography>
                  <Typography>
                    {card.info}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </>
    );
};

export default DashBoard;