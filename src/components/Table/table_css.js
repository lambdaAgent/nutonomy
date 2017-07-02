const table = `
.one-column-emphasis{
	font-size: 16px;
	width: 1024PX;
	text-align: left;
	border: 1px solid #dddddd;
	border-collapse: collapse;
	margin: 20px;
}

.one-column-emphasis th{
	font-size: 15px;
	font-weight: bold;
	color: #039;
	padding: 12px 15px;
}

.one-column-emphasis th.sortable{
	position: relative;
  cursor: pointer;
  user-select: none;
  padding-right: 2rem;
}
.one-column-emphasis th span.sortable::after{
	 position: absolute;
	  content: '';
	  width: 20px;
	  height: 20px;
	  top: 50%;
	  right: 10px;
	  margin-top: -10px;
	  background: url('/static/sort_sprite.png') no-repeat 0 0;
	  overflow: hidden;
}
.one-column-emphasis th span.sortable.sort-asc::after{
	 background-position: -20px 0;
}
.one-column-emphasis th span.sortable.sort-dsc::after{
	 background-position: -40px 0;
}


.one-column-emphasis td{
	color: #000000;
	border-top: 1px solid #e8edff;
	padding: 10px 15px;
}

.one-column-emphasis tbody tr:first-child{
	border-top: 5px solid #e8edff;
}

.one-column-emphasis tbody tr:nth-child(even){
	background-color: #efe8ff;
}`

export default table;