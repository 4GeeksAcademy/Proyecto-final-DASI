import React, { Component } from "react";

export const Footer = () => (


	<footer className="footer bg-success bg-opacity-25">

		<div className="container">
			<div className="row pt-3">
				<div className="accordion d-flex col-md-6 " id="accordionPanelsStayOpenExample">
					<div className="accordion-item bg-success bg-opacity-25">
						<h2 className="accordion-header" id="flush-headingOne">
							<button className="accordion-button collapsed bg-success bg-opacity-25" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
								Contacto
							</button>
						</h2>
						<div id="flush-collapseOne" className="accordion-collapse collapse " aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
							<div className="accordion-body">

								email:

								<br/>

								teléfono:

							</div>
						</div>
					</div>

					
				</div>
				
				<div className="col-md-6 text-end">
					<p>Powered by DASI Develop</p>
				</div>
			</div>
		</div>

	</footer>

);
