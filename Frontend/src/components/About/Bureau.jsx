import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const EthiopianTextComponent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* First Row */}
      <Grid container spacing={3}>
        {/* First Column */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                የአብክመ ባህልና ቱሪዝም ቢሮ ተልዕኮ፣ ርዕይ እና እሴቶች ተግባርና ሃላፊነት
              </Typography>
              <Divider sx={{ my: 1, width: "20%" }} />
              <Typography variant="h6" fontWeight="bold">
                ተልዕኮ
              </Typography>
              <Typography variant="body1" paragraph>
                በክልሉ የሚገኙ ባህላዊ፣ታሪካዊ እና ተፈጥሯዊ ሃብቶችን በመለየት፣ በማጥናት፣ በመጠበቅ፣ በማልማትና
                በማስተዋወቅ ለክልሉ ህዝብ ኢኮኖሚያዊ፣ማህበራዊ፣ፖለቲካዊና አካባቢያዊ እድገት የላቀ አስተዋጽኦ
                እንዲኖራቸዉ ማድረግ፡፡
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ርዕይ
              </Typography>
              <Typography variant="body1">
                የባህልና ቱሪዝም ዘርፍ ቀዳሚ የኢኮኖሚ እና የማህበራዊ ልማት መሰረት ሆኖ 2022 ዓ.ም የክልሉን
                ዓመታዊ ምርት 20 በመቶ ሸፍኖ ማየት፡፡
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                እሴቶች
              </Typography>
              <ul>
                <li>እንግዳ ተቀባይነት፣</li>
                <li>ብዝሀነትን ማክበር፣</li>
                <li>ለለውጥ እንተጋለን፣</li>
                <li>የላቀ አገልግሎት፣</li>
                <li>አሳታፊነት፣</li>
                <li>ለህብረተሰብ ጥቅም ቅድሚያ እንሰጣለን፣</li>
                <li>ግልጽነት፣</li>
                <li>ተጠያቂነት፣</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                በቀጣይ 10 ዓመት በተቋሙ ትኩረት የሚደረግባቸው ስትራቴጂያዊ የትኩረት መስኮች
              </Typography>
              <Divider sx={{ my: 1, width: "20%" }} />
              <Typography variant="body1" paragraph>
                ባህል እና ቱሪዝም ዘርፍ በቀጣይ የ10 ዓመት ዕቅድ በአዋጅ የተሰጠውን ተግባርና ሀላፊነት፣ባለፉት
                አመታት በአፈጻጸም ወቅት የነበሩ ጥንካሬዎችን፣ድክመቶችን፣የመልካም አጋጣሚዎችንና ስጋቶች የግምገማ
                ውጤቶች፣ክልሉ ያለውን እምቅ አቅም እና ወቅቱ የሚጠይቀውን ነባራዊ ሁኔታ መነሻ በማድረግ የርብርብ
                ማእከል የሚሆኑ የሚከተሉት ትኩረት መስኮች ተለይተው ቀርበዋል፡፡
              </Typography>
              <ol>
                <li>የቅርስና መስህብ ሃብቶች ዘላቂ ጥበቃ እና እንክብካቤ፣</li>
                <li>የባህል እሴቶችና ኢንዱስትሪ ልማት፣</li>
                <li>የቱሪዝም መዳረሻዎች ልማትና የላቀ ተወዳደሪነት፣</li>
                <li>የላቀ አገልግሎት አሰጣጥ፣</li>
                <li>ተቋማዊ አቅም ግንባታ፣</li>
              </ol>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EthiopianTextComponent;
