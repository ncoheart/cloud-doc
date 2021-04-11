import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-4 bg-light left-panel">
          <FileSearch
            title='我的云文档'
            onFileSearch={(value) => {console.log(value)}}          
          />
          <FileList
            files={defaultFiles}
            onFileClick = {(id) => {console.log(id)}}
            onFileDelete = {(id) => {console.log('deleting', id)}}
            onSaveEdit = {(id, newValue) => {console.log(newValue);}}
          />
        </div>

        <div className="col-8 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>

      </div>
    </div>
  );
}

export default App;
