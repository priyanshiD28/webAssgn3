import { Container } from '@mui/material';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, {useState} from 'react';
import {useData} from '../DataContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Changed faXTwitter to faTwitter
import { MdClear } from "react-icons/md";
import ClearIcon from '@mui/icons-material/Clear';
import { Modal, Button, Form } from 'react-bootstrap'; // Assuming you're using Bootstrap for Modal and Button components



function GridExample() {
    const handleNewsModalOpen = (item) => {
        setShowNewsModal(true)
        setNewsObject(item);
    };

    const [showNewsModal, setShowNewsModal] = useState(false);

    const handleNewsModalClose = () => {
        setShowNewsModal(false);
    };
    const {
        newsData, setNewsData
    } = useData();

    //var newsObject = {source:'', date:'', headline:'', summary:'', url:''}
    const [newsObject, setNewsObject] = useState([]);
    

    return (
    <>
        <Container>
        <Modal show={showNewsModal} onHide={handleNewsModalClose}>
            <Modal.Header>
                <Modal.Title>
                    <Form>
                        <Form.Group >
                            <span style={{ fontSize: '30px' }}>
                                {newsObject && newsObject.source}
                            </span>

                        </Form.Group>
                        <Form.Group>
                            {newsData && (
                                <span style={{ fontWeight: 'normal', fontSize: '15px' }}>
                                    {new Date(newsObject.date * 1000).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}
                                </span>
                            )}
                        </Form.Group>

                    </Form>
                </Modal.Title>
                <Button variant='btn-primary-outline'><ClearIcon onClick={handleNewsModalClose} /></Button>
            </Modal.Header>
            <Modal.Body>
                {/* Modal body content here */}
                <Form.Group>
                    <b>{newsObject && newsObject.headline}</b>
                </Form.Group>

                {newsObject && newsObject.summary}

                <Form.Group>
                    For more details click <a target="_blank" href={newsObject && newsObject.url}>Here</a>
                </Form.Group>

                <div style={{ border: '0.2px solid gray', padding: '2%' }}>
                    <div> Share </div>
                    <div style={{ display: 'inline-block' }}>
                        <Button variant='btn-primary-outline' onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsObject && newsObject.headline)}+ ' ' + ${encodeURIComponent(newsData && newsData.url)}`, '_blank')} style={{ verticalAlign: 'middle' }}> {/* Updated href to onClick */}
                            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '2.2em' }} /> {/* Updated icon */}
                        </Button>
                        <span className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
                            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newsObject && newsObject.url)}`} className="fb-xfbml-parse-ignore" style={{ fontSize: '2.2em', verticalAlign: 'middle' }}>
                                <FontAwesomeIcon icon={faSquareFacebook} style={{ fontSize: 'inherit' }} />
                            </a>
                        </span>
                    </div>

                </div>
            </Modal.Body>
        </Modal>

            <Row xs={1} className="justify-content-md-center g-4">
            {newsData
            .filter(item => item.headline && item.image) // Filter news with headline and image
            .slice(0, 20) // Get top 20 news items
            .map((item, idx) => (
                <Col xs md lg="5" key={idx}>
                <Card style={{ width: 'auto', height: 'auto', cursor: 'pointer'}} onClick={() => handleNewsModalOpen({source: item.source, date: item.datetime, headline: item.headline, summary: item.summary, url: item.url})}>
                    <Card.Img variant="top" src={item.image} alt={item.title} height={250}/>
                    <Card.Body>
                    <Card.Text>
                        {item.headline}
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            
            </Row>
        </Container>
    </>
  );
}

export default GridExample;