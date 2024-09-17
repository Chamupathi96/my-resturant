import React from 'react'
import Layout from '../components/Layout/Layout'
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Layout>
      <Box sx={{
        my:15,
        textAlign: "center",
        p:2,
        "& h4" : {
          fontWeight: "bold",
          my:2,
          fontSize: '2rem'
        },
        "& p":{
          textAlign: "justify",
        },
          "@media (max-width:600px)":{
            mt:0,
            "& h4 ": {
              fontSize: "1.5rem",
            },
          },
        }}
        >
        <Typography variant="h4">Welcome To My Resturant</Typography>
           <p>Designed to be the Culinary epicenter, We try to uphold the traditions of the Local Household while bringing out the flavours of Sri Lanka with a bounty of fresh seasonal ingredients. We take extra care to deliver fresh farm produce to a local classy table cuisine with an emphasis on seasonal & locally sourced ingredients and with the freshest Seafood. May it be the ery hot curries or the soothing buffalo curd, We enjoy bringing the most sought after dishes with a little twist of our own. Just as we take pride in supporting local farm communities in Sri Lanka, We take pride & joy in bringing you the homely ambiance along with your food. Our interior is designed to bring you the olden day Walawwa Experience while you’re dining with us. The Colonial space that we have opened for you has its modern & vintage touch, inviting you to a feel at home experience while you dine . Our mural wall has harmoniously incorporated the colonial architecture style to show you a cultural infusion. We want you to sit down and enjoy your meal just like the way you enjoy your homemade dishes! We have embarked on this journey and e are glad that you have taken the time off of your schedule to know our story to experience our experience. We couldn’t have done it without you
           </p>
           <br/>
           <p>Food anywhere in the world is known for one crucial aspect and it is said that “food brings out the culture of whatever the destination you are in”. At Culture Colombo we have literally taken the aforementioned ...

     </p>
      </Box>
    </Layout>
  )
}

export default About