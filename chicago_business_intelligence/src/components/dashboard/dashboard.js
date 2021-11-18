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
          info: 'We are giving various form of covid reports daily, weekly, and ' + 
          'monthly with google charts.',
          image: CoronaImage
        },
        {
          header: 'Taxi Trips Information',
          info: 'We are giving various form of covid reports daily, weekly, and ' + 
          'monthly with google charts.',
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
            <Grid item key={card.header} xs={12} sm={6} md={4}>
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