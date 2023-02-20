import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './app.css'
import { useGetSynonyms } from './hooks/useGetSynonyms'
import { motion } from 'framer-motion'

const App = () => {
	const [word, setWord] = useState('')
	const [isWord, setIsWord] = useState(0)
	const { isLoading, synonyms, getSynonyms } = useGetSynonyms()

	const handleFetchSynonyms = (e: React.FormEvent) => {
		e.preventDefault()
		getSynonyms(word)
	}

	const handleSynonymClicked = (newWord: string) => {
		setWord(newWord)
		getSynonyms(newWord)
	}

	return (
		<div className="app  text-white flex flex-col align-center pt-2">
			<div className="">
				<form
					onSubmit={handleFetchSynonyms}
					className="flex align-top justify-center "
				>
					<label htmlFor="word-input" className="text-xl mr-4">
						Synonymize:{' '}
					</label>
					<input
						value={word}
						onChange={(e) => setWord(e.target.value)}
						id="word-input"
						type="text"
						className="text-black rounded-md text-xl"
					/>
					<button className="bg-red-600 px-4 text-white rounded-md ml-4">
						Submit
					</button>
				</form>
			</div>
			<div className="flex justify-center text-center mt-4">
				{isLoading ? (
					<div>loading...</div>
				) : (
					<ul
						className="text-lg"
						style={{ position: 'relative', listStyleType: 'none' }}
					>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
						>
							{synonyms.map((synonym, index) => (
								<motion.li
									key={synonym.word}
									onClick={() => handleSynonymClicked(synonym.word)}
									whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
									whileTap={{ scale: 0.9 }}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									style={{
										position: 'relative',
										left: '1rem',
										cursor: 'pointer',
									}}
								>
									{synonym.word}
								</motion.li>
							))}
						</motion.div>
					</ul>
				)}
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
