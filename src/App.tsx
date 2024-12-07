import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Root } from './pages/Root'
import ScanPage from './pages/Scan.tsx'
import RecvJoinPage from './pages/RecvJoin.tsx'
import RecvPage from './pages/Recv.tsx'

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Root />}>
              <Route index element={<ScanPage></ScanPage>} />
              <Route path='recv' element={<RecvJoinPage></RecvJoinPage>} />
              <Route path='recv/:id' element={<RecvPage></RecvPage>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
