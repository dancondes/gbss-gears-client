import React from 'react'
import PropTypes from 'prop-types'
import { gbss_logo } from '@/assets/images'

const CompanyBrand = ({ title, description }) => {
	return (
		<div className="hidden md:flex md:w-3/5 bg-white items-center justify-center p-12 relative">
			{/* Blue accent decorations */}
			<div className="absolute top-0 left-0 w-32 h-32 bg-primary opacity-10 rounded-br-full"></div>
			<div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary opacity-10 rounded-tl-full"></div>

			<div className="max-w-md text-center relative z-10">
				{/* Logo */}
				<div className="mb-4">
					<img
						src={gbss_logo}
						alt="GBSS Logo"
						className="mx-auto h-32 w-auto"
					/>
				</div>
				{/* Branding Text */}
				<h1 className="text-4xl font-bold text-primary mb-4">
					{title}
				</h1>
				<p className="mt-4 text-sm text-tertiary">
					{description}
				</p>
			</div>
		</div>
	)
}

CompanyBrand.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
}

export default CompanyBrand
