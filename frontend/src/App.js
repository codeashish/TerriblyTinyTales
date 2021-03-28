import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
	const [rollno, setrollno] = useState('');
	const [data, setData] = useState({});
	const [wait, setwait] = useState('');
	function change(e) {
		setrollno(e.target.value);
	}
	async function submit(e) {
		e.preventDefault();
		setData({});
		if (!rollno) {
			alert('Enter roll no');
			return;
		}
		setwait('Please wait');
		let res = await axios.post('/rollno', { data: rollno });

		setData(res.data);

		setwait('');
	}

	return (
		<div className="App">
			<h1 className="m-4"> Enter Your Roll no </h1>

			<div className="form-group">
				<input
					type="text"
					id="search"
					placeholder="Enter RollNumbers seperated by commas"
					className="form-control form-control-lg "
					onChange={(e) => change(e)}
				/>
				<div className="col-md-12 text-center">
					<input type="submit" onClick={(e) => submit(e)} className="m-4 btn btn-outline-success btn-lg  " />
				</div>
			</div>
			{wait && <h2 style={{ fontSize: '50px' }}> Please wait... </h2>}
			{Object.keys(data).length !== 0 && (
				<div>
					<h2 style={{ fontSize: '100px' }}>Result</h2>
					<table border={2} cellPadding={5} className="container">
						<thead>
							<tr>
								<td style={{ fontSize: '35px', color: '#03e9f4' }}>Roll no</td>
								<td style={{ fontSize: '35px', color: '#03e9f4' }}>Result</td>
							</tr>
						</thead>
						<tbody>
							{data &&
								Object.keys(data).map(function (element, index) {
									return (
										<tr key={index}>
											<td style={{ fontWeight: 'bolder', fontSize: '30px	', color: 'grey' }}>
												{element}
											</td>
											<td
												style={{
													color: data[element] !== 'Pass' ? 'red' : 'green',
													fontWeight: 'bolder',
													fontSize: '30px	',
												}}
											>
												{data[element]}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default App;
