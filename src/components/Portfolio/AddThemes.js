import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { Table } from 'react-bootstrap';


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
            alert(`Your themeId is: ${savedThemeId}`);
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
            alert('Asset saved successfully!');
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
            <br />
            <h1> Customize Your Theme</h1>
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="themeName">
                    <Form.Label className='font-weight-bold' style={{ fontSize: '30px', color: 'darkblack' }}>Theme Name</Form.Label>
                    <Form.Control type="text" value={themeName} onChange={(e) => setThemeName(e.target.value)} style={{ fontSize: '16px', color: 'black' }} />
                </Form.Group>
                <br />
                <Form.Group controlId="risk">
                    <Form.Label className='font-weight-bold'>Risk</Form.Label>
                    <Form.Control type="text" value={risk} onChange={(e) => setRisk(e.target.value)} />
                </Form.Group>
                <br />
                <br />
                <Form.Group controlId="investmentHorizon">
                    <Form.Label className='font-weight-bold'>Investment Duration</Form.Label>
                    <Form.Control type="text" value={investmentHorizon} onChange={(e) => setInvestmentHorizon(e.target.value)} />
                </Form.Group>

                <Button className='btn btn-info' type="submit"> Save</Button>
            </Form>
            <br />
            <br />
            <h1>Add Assets to Theme</h1><br />
            <div>
                <div className='table table-sm table-dark'>

                    <Form onSubmit={handleSubmits}>
                        <label htmlFor="themeId">Your ThemeID</label>
                        <input
                            type="text"
                            id="themeId"
                            name="themeId"
                            value={themeId}
                            onChange={(e) => setThemeId(e.target.value)}
                        />
                        <Table striped bordered hover>
                            <thead className="thead-dark">
                                <tr className="table table-sm table-dark">
                                    <th>Theme ID</th>
                                    <th>Asset Name</th>
                                    <th>Allocation Percentage</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset, index) => (
                                    <tr key={index}>
                                        <td className="font-weight-bold text-dark" ><Form />{themeId}</td>
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
                                            {index === assets.length - 1 && (
                                                <Button className='btn btn-info' onClick={handleAddRow}> Add Row</Button>
                                            )}&nbsp;
                                            <Button className='btn btn-info' onClick={() => handleDeleteRow(index)}>Delete</Button> &nbsp;
                                            <Button className='btn btn-info' onClick={() => handleSaveAsset(asset)}>Save</Button> &nbsp;
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {/* <Button type="submit" className='btn btn-info'>Save Assets</Button> */}
                        <button
                            className="my-button" type="submit" onClick={navigate("/landingpage")}>
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