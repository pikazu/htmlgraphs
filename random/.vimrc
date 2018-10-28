set tabstop=4 shiftwidth=4 noexpandtab nu
syntax on
set hlsearch
set incsearch
set background=dark
set smartindent
set mouse=a
set wildmenu

" http://learnvimscriptthehardway.stevelosh.com/
function CompileLatex(fname)
	execute "silent !pdflatex -halt-on-error " . a:fname
	" Show error messages if there are errors... 
	execute "redraw!"
	echom "Compiled " . a:fname
	" Clean *.log and *.aux files
endfunction

" http://vimdoc.sourceforge.net/htmldoc/autocmd.html
" abbreviated as 'au'
autocmd BufWritePost *.tex call CompileLatex(expand('%:p'))

 
