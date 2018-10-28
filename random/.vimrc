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
	
	" Refresh pdf view by swapping focus after compiling
	execute "silent !open " . a:fname[:-4] . "pdf"
	execute "silent !open -a Terminal"

	" Clean *.log and *.aux files
	let files = split(globpath('.', '*.aux') . "\n" .  globpath('.', '*.log'), "\n")
endfunction

" http://vimdoc.sourceforge.net/htmldoc/autocmd.html
" au[tocmd]
autocmd BufWritePost *.tex call CompileLatex(expand('%:p'))

