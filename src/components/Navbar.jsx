import { useState } from 'react';


export default function Navbar() {
    const [query, setQuery] = useState('');
    return (
        <nav className='navbar'>

            <form className='search-form'>
                <input
                    type='text'
                    value={query}
                    placeholder='Search recipe...'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
        </nav>
    )
}