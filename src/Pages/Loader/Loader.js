import React from "react";
import ContentLoader, {
  BulletList,
  Facebook,
  Instagram,
  List,
} from "react-content-loader";
import { Container } from "reactstrap";

export default function Loader() {
  return (
    <div>
      <Container>
      <ContentLoader speed={2} width={340} height={500}>
            <rect x="0" y="0" rx="5" ry="5" width="340" height="200" />
            <rect x="0" y="210" rx="5" ry="5" width="50" height="50" />
            <rect x="60" y="220" rx="4" ry="4" width="200" height="30" />
            <rect x="0" y="270" rx="5" ry="5" width="340" height="25" />
            <rect x="0" y="310" rx="5" ry="5" width="340" height="15" />
            <rect x="0" y="340" rx="2" ry="2" width="100" height="10" />
            <rect x="120" y="340" rx="2" ry="2" width="100" height="10" /> 
                     
          
          </ContentLoader>
        
      </Container>
      
        



      
    </div>
  );
}
