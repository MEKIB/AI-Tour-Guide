import React from "react";
import { Container, Grid, Typography, Divider } from "@mui/material";

const Mandate = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            የአብክመ ባህልና ቱሪዝም ቢሮ ተግባርና ሃላፊነት{" "}
          </Typography>
          <Divider
            style={{
              backgroundColor: "#d32f2f",
              height: "2px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="body1" paragraph>
            በአማራ ክልል የአስፈጻሚ አካላት ተግባርና ሃላፊነት ማሻሻያ አዋጅ ቁጥር 264/2011 ዓ.ም እንደተገለፀው
            በሌሎች ሕጐች አስቀድሞ የተደነገገው ወይም ወደፊት የሚደነገገው እንደተጠበቀ ሆኖ የክልሉ ባህልና ቱሪዝም ቢሮ
            የሚከተሎት ዝርዝር ስልጣንና ተግባራት አሉት፡-<strong>264/2011</strong>
          </Typography>
          <Typography variant="body2" component="ol">
            <li>የክልሉን ባህላዊ እሴቶች ያጠናል፣ መልካም የባህል ገፅታው እንዲዳብር ይጥራል፤</li>
            <li>
              በክልሉ ውስጥ ጎጂ ልማዳዊ ድርጊቶችና መጤ ባህሎች እንዲወገዱና ጠቃሚ የባህል እሴቶች እንዲስፋፉ
              ህብረተ-ሰቡን በማሳተፍ ከተለያዩ መንግሥታዊና መንግሥታዊ ካልሆኑ ድርጅቶች ጋር ይሰራል፤
            </li>
            <li>
              በክልሉ ውስጥ የባህል ቡድኖችና የኪነ-ጥበብም ሆነ የእደ-ጥበብ ክበባት እንዲደራጁና በባህሉም ሆነ
              በቱሪዝሙ ኢንዱስትሪ ልማት ገብተው በንቃት እንዲሳተፉ ያነሳሳል፣ ያበረታታል፤
            </li>
            <li>
              በክልሉ ውስጥ የባህል ተቋማት እንዲስፋፉ ያደርጋል፣ በዘርፉ ለሚሰማሩ ወገኖች የሙያ ብቃት ማረጋገጫ ፈቃድ
              ይሰጣል፣ አፈፃፀሙን ይከታተላል፣ ይቆጣጠራል፤
            </li>
            <li>
              በክልሉ ውስጥ በማንኛውም ሰው፣ ማህበር፣ የሐይማኖት ድርጅት ወይም ተቋም እጅ የሚገኙ ቅርሶች በሚገባ
              እንዲያዙና እንዲጠበቁ ድጋፍ ይሰጣል፣ይመዘግባል፣ይቆጣጠራል፣ በኤግዚቢትነት የተያዙ ቅርሶችን ተቀብሎ
              አግባብነት ባለው መንገድ ያስተዳድራል፣
            </li>
            <li>
              በክልሉ ውስጥ የሚኖሩት ብሔር-ብሔረ-ሰቦችና ህዝቦች ታሪክና ባህል በሚገባ ተመዝግቦ እንዲያዝና እንዲጠና፣
              ቋንቋዎቻቸውም እንዲዳብሩና እንዲስፋፉ ያደርጋል፤
            </li>
            <li>
              በክልሉ ውስጥ ባህልና ቱሪዝም-ነክ የሆኑ መረጃዎችን ያሰባስባል፣ያጠናቅራል፣
              ይተነትናል፣ያሰራጫል፣አስቀድመው በሚደረጉ የገበያ ጥናቶች ላይ ተመስርቶ የክልሉን የቱሪስት መስህብ ሀብቶች
              በተለያዩ ዘዴዎች በማስተዋወቅ ሀገር-በቀልና የውጭ ቱሪዝምን ያስፋፋል፤
            </li>
            <li>
              በቱሪዝምና በመስተንግዶ፣ እንዲሁም በጉዞና በአስጎብኝነት ሥራዎች የተሠማራው የሰው ሃይል ተገቢውን ሥልጠና
              የሚያገኝበትን ሁኔታ ያመቻቻል፣ ያሰለጥናል፤
            </li>
            <li>በክልሉ ውስጥ አኩሪ የቱሪዝም ባህል እንዲዳብር ያደርጋል፤</li>
            <li>
              በፓርኮችና በሌሎች ጥብቅ ሥፍራዎች የሚገኘውን ህብረተ-ሰብ ቀጥተኛ ተጠቃሚ የሚያደርጉ የቱሪዝም ዓይነቶችን
              ይለያል፣ እውቅና ይሰጣል፣ ይመዘግባል፣ የሚለሙበትን ሁኔታ ያመቻቻል፤
            </li>
            <li>
              በክልሉ ውስጥ ማህበረ-ሰብ አቀፍ ቱሪዝም የሚያድግበትንና የሚጎለብትበትን ሁኔታ ያመቻቻል፤ ይህንን አዋጅ
              ተከትሎ የሚወጣውን የአገልግሎት ዓይነት ስታንዳርድ መሠረት በማድረግ በክልሉ ውስጥ ለሚሰሩ የቱሪስት
              አገልግሎት ሠጪ ድርጅቶች ደረጃ ይሰጣል፣ ደረጃውን ጠብቀው ብቃትና ጥራት ያለው አገልግሎት መስጠታቸውን
              ይከታተላል፣ ይቆጣጠራል፣ ግዴታቸውን ባልተወጡት ላይ ደግሞ የእርምት እርምጃዎችን ይወስዳል፣ ያስወስዳል፤
            </li>
            <li>
              የቱሪስት ጉዞ መስመሮችና የመመልከቻ ቦታዎች እንዲሠናዱና እንዲደራጁ ያደርጋል፣ ጉዳዩ ከሚመለከታቸው
              አካላት ጋር በመተባበር በክልሉ ውስጥ የሚካሄዱ የመሠረተ-ልማት ግንባታዎችና ሌሎች የአካባቢ ልማት ስራዎች
              ቱሪዝምን በሚደግፍ መንገድ ስለመካሄዳቸው በቅርብ ይከታተላል፤
            </li>
            <li>
              አግባብ ካላቸው የክልሉ መንግሥት አካላት ጋር በመተባበር በብሔራዊ ቅርሶች እና በፓርኮች ውስጥ የሰፈረው
              ነዋሪ ህዝብ ራሱ በሚሳተፍበትና የመፍትሔው አካል ሆኖ በሚቀርብበት አኳኋን ወደ ሌላ አካባቢ ሊዛወር
              የሚችልበትን ስልት ይቀይሳል፤
            </li>
            <li>
              በክልሉ ውስጥ በቱሪስት አገልግሎቶች ንግድ ለሚሠማሩ ድርጅቶች፣ተቋማትና ግለሰቦች የሙያ ብቃት ማረጋገጫ
              የምስክር ወረቀት ይሰጣል፣ ይደግፋል፣
            </li>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Mandate and Responsibility
          </Typography>
          <Divider
            style={{
              backgroundColor: "#d32f2f",
              height: "2px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="body1" paragraph>
            In accordance with the provisions of other laws enacted or will be
            enacted in other laws, as stated in the Amhara State Executive
            Proclamation No. 264/2011, The Amhara Regional State Culture and
            Tourism Bureau has the following detailed powers and functions as
            follows:
            <strong>264/2011</strong>.
          </Typography>
          <Typography variant="body2" component="ol">
            <li>
              Study the cultural values ​​of the region and strive to develop a
              positive cultural landscape;
            </li>
            <li>
              It works with various governmental and non-governmental
              organizations to involve the community in the elimination of
              harmful traditional practices and immigrant cultures and the
              spread of important cultural values ​​in the region;
            </li>
            <li>
              Encourage and encourage cultural groups and art and craft clubs to
              be organized in the region and to actively participate in the
              development of the culture and tourism industry;
            </li>
            <li>
              Encourage the expansion of cultural institutions in the region,
              issue licenses to those engaged in the sector, monitor and
              supervise its implementation;
            </li>
            <li>
              Provides, records, supervises, manages, and manages the artifacts
              in the hands of any person, association, religious organization,
              or institution in the region.
            </li>
            <li>
              Ensure that the history and culture of the nations and peoples
              living in the region are properly documented and studied and that
              their languages ​​are developed and expanded;
            </li>
            <li>
              It collects, compiles, analyzes, and disseminates cultural and
              tourism-related information in the region and promotes domestic
              and foreign tourism by promoting the region’s tourist attractions
              in various ways based on pre-existing market research.
            </li>
            <li>
              Facilitates and trains the human resources engaged in tourism and
              hospitality, as well as travel and tourism.
            </li>
            <li>Promotes tourism culture in the region</li>
            <li>
              Identifies, recognizes, registers, and facilitates the development
              of tourism that directly benefits the community in parks and other
              protected areas;
            </li>
            <li>
              Facilitates the growth and development of social tourism in the
              region; Based on the standard of the type of service to be issued
              following this Proclamation, it shall ratify the tourist service
              providers operating in the region;
            </li>
            <li>
              It organizes and organizes tourist routes and observations, and
              closely monitors the ongoing infrastructure construction and other
              environmental development activities in collaboration with the
              stakeholders in a way that supports tourism.
            </li>
            <li>
              In collaboration with the relevant regional government bodies, it
              shall devise a strategy to relocate the residents of the national
              heritage and parks in such a way that the people themselves can
              participate and be part of the solution;
            </li>
            <li>
              Provides certification of professional qualifications to
              organizations, institutions, and individuals engaged in tourism
              services in the region.
            </li>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mandate;
