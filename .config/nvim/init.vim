call plug#begin('~/.vim/plugged')

Plug 'morhetz/gruvbox'
Plug 'terryma/vim-multiple-cursors' " funciona con la combinacion de teclas <ctrl><n> y con la tecla <c> elimina para escribor en las mulicursores seleccionados
Plug 'sheerun/vim-polyglot'
Plug 'jiangmiao/auto-pairs'
"Plug 'preservim/nerdtree'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
"Plug 'ctrlpvim/ctrlp.vim'
Plug '907th/vim-auto-save'


call plug#end()

colorscheme gruvbox
set background=dark

set title  " Muestra el nombre del archivo en la ventana de la terminal
set number  " Muestra los números de las líneas
set mouse=a  " Permite la integración del mouse (seleccionar texto, mover el cursor)
set cursorline  " Resalta la línea actual
"set colorcolumn=120  " Muestra la columna límite a 120 caracteres
set termguicolors  " Activa true colors en la terminal
set relativenumber " Muestra el numero de la linea en la que estamos
set inccommand=split " Hace que la busqueda sea mas interactiva
set autoindent " Auto indentacion
set hlsearch " Resalta la busqueda
set incsearch 
set cuc cul " Resalta la columna activa
set clipboard=unnamedplus " Habilita el portapapeles del sistema
set tabstop=4 " Configura el tabulador a cuatro espacios
set shiftwidth=4
set softtabstop=4
set expandtab

syntax on " Enable syntax highlighting

filetype plugin indent on " Enable filetype-specific indenting and plugins

syntax enable " Syntax highlighting and theme

"Configuracion air-line
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#left_sep = ' '
let g:airline#extensions#tabline#left_alt_sep = '|'
let g:airline#extensions#tabline#formatter = 'default'

" Configuracion de auto-save
let g:auto_save = 1  " enable AutoSave on Vim startup

"Mappings

"Usa las teclas <ctrl><s> para guardar 
nnoremap <C-s> :w<CR>

"Usamos las teclas <ctrl><q> para salir
nnoremap <C-q> :q<CR>

"Usamos las teclas <ctrl><w> para cambiar de buffer
nnoremap <C-w> :bnext<CR>

"Usamos las teclas <ctrl><x> para cerrar el buffer actual
nnoremap <C-x> :bd<CR>

"Usa las teclas <ctrl><m> para ejecutar NerdTree
"map <C-m> :NERDTreeToggle<CR>

