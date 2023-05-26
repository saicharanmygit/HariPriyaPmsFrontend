import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { Table } from 'react-bootstrap';
import "./AddThemes.css";


function AddThemes() {
    const [themeName, setThemeName] = useState('');
    const [risk, setRisk] = useState('');
    const [investmentHorizon, setInvestmentHorizon] = useState('');
    const [themeId, setThemeId] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const savedthemeId = searchParams.get('savedThemeId');
    // const [themeId, setThemeId] = useState('');
    const [assets, setAssets] = useState([{ assetName: '', allocation: '' }]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const themeData = { themeName, risk, investmentHorizon };
            const response = await axios.post('http://localhost:8081/Themes/addThemes', themeData);
            const savedThemeId = response.data.themeId;
            // setThemeId(response.data.themeId);
            // Display themeId in pop-up
            alert(`Your theme is created with id : ${savedThemeId}`);
            // navigate(`/AddAssetsPage?themeId=${savedThemeId}`);
        } catch (error) {
            console.error(error);
        }
    }
    const handleAddRow = () => {
        setAssets([...assets, { assetName: '', allocation: '' }]);
    };
    const handleDeleteRow = (index) => {
        const newAssets = [...assets];
        newAssets.splice(index, 1);
        setAssets(newAssets);
    };
    const handleAssetChange = (e, index) => {
        const { name, value } = e.target;
        const newAssets = [...assets];
        newAssets[index][name] = value;
        setAssets(newAssets);
    };
    const handleSaveAsset = async (asset) => {
        try {
            const data = {
                assetName: asset.assetName,
                allocation: asset.allocation,
                theme: { themeId: parseInt(themeId) },
            };
            await axios.post(`http://localhost:8081/Asset/addAsset`, data);
            alert('Asset added!');
        } catch (error) {
            console.error(error);
            alert('Asset Allocation Reach 100% You cant add more assests!');
        }
    };
    const handleSubmits = async (e) => {
        e.preventDefault();
        try {
            await Promise.all(assets.map((asset) => handleSaveAsset(asset)));
            alert('Assets saved successfully!');
            setThemeId('');
            setAssets([{ assetName: '', allocation: '' }]);
        } catch (error) {
            console.error(error);
            alert('Error saving assets!');
        }
    };
    return (

        <div className="container">
            {/* <Navbar /> */}
            
            <br />
            <h2> Customize Your Theme</h2>
            <br />

            <Form>
                <div className="side-by-side">
                    <Form.Group controlId="themeName">
                        <Form.Label className='font-weight-bold' style={{ fontSize: '25px', color: 'darkblack' }}>Theme Name</Form.Label>
                        <Form.Control type="text"  value={themeName} onChange={(e) => setThemeName(e.target.value)} style={{ fontSize: '16px', color: 'black',border:"2px solid black" }} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
                    <br />
                    <Form.Group controlId="risk">
                        <Form.Label className='font-weight-bold' style={{ fontSize: '25px', color: 'darkblack' }}>Risk</Form.Label>
                        <Form.Control type="text" style={{border:"2px solid black"}}value={risk} onChange={(e) => setRisk(e.target.value)} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;
                    <br />
                    <br />
                    <Form.Group controlId="investmentHorizon" style={{ fontSize: '25px', color: 'darkblack' }}>
                        <Form.Label className='font-weight-bold'>Investment Duration</Form.Label>
                        <Form.Control type="text" style={{border:"2px solid black"}}value={investmentHorizon} onChange={(e) => setInvestmentHorizon(e.target.value)} />
                    </Form.Group>&nbsp;&nbsp;&nbsp;

                </div>
            </Form>
            <br></br>
            <br></br>
            <div className="but">
                <button className="l1" type="submit" onClick={handleSubmit} >Save</button>
            </div>
            <br />
            <br />
            <h1>Add Assets to Theme</h1><br />
            <div>
                <div className='table table-sm table-dark'>

                    <Form onSubmit={handleSubmits}>
                        <label htmlFor="themeId" style={{fontSize:"20px",color:"black"}} className="themeid">Your Theme ID  :&nbsp;</label>
                        <input
                            type="text"
                            id="themeId"
                            name="themeId"
                            value={themeId}
                            onChange={(e) => setThemeId(e.target.value)}
                        />
                        <Table striped bordered hover className='tableasset'>
                            <thead className="thead-dark">
                                <tr className="table table-sm table-dark">
                                    {/* <th>Theme ID</th> */}
                                    <th>Asset Name</th>
                                    <th>Allocation Percentage</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset, index) => (
                                    <tr key={index}>
                                        {/* <td className="font-weight-bold text-dark" ><Form />{themeId}</td> */}
                                        <td>
                                            <Form.Control
                                                type="text"
                                                name="assetName"
                                                value={asset.assetName}
                                                onChange={(e) => handleAssetChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                name="allocation"
                                                value={asset.allocation}
                                                onChange={(e) => handleAssetChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <Button className='btn btn-info save' onClick={() => handleSaveAsset(asset)}>Save</Button>&nbsp;
                                            {index === assets.length - 1 && (
                                                <Button className='btn btn-info addbutton' onClick={handleAddRow}> Add </Button>
                                            )}
                                            {/* <Button className='btn btn-info' onClick={() => handleDeleteRow(index)}>Delete</Button> &nbsp; */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        
                        {/* <Button type="submit" className='btn btn-info'>Save Assets</Button> */}
                        {/* <button
                            className="my-button" type="submit" onClick={navigate("/landingpage")}>
                            Go Back
                        </button> */}
                        <button
                            className="btn btn-info backbutton"
                            onClick={() => navigate("/landingpage")}
                        >
                            Go Back
                        </button>
                    </Form>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
export default AddThemes;