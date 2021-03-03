import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const Themechanger = () => {
  return (
    <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <label className="theme-changer-wrapper">
        <input
          type="checkbox"
          aria-label="Dark or light mode"
          className="theme-changer"
          onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
          checked={theme === 'dark'}
        />{' '}
        <div className="mode-container">
          <i className="gg-sun"></i>
          <i className="gg-moon"></i>
        </div>
      </label>
    )}
  </ThemeToggler>
  )
}

export default Themechanger