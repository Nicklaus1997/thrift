"""
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
"""
Param
  (
     [parameter(Position=0, Mandatory=$true)]
     [String]
     $thriftFile
  ) 

Write-Host 'processing file :' $thriftFile
$exe = '.\thrift.exe'
$type = 'js'

$jsFilePath = $PSScriptRoot + "\gen-js"
$ohosFolder = $PSScriptRoot + "\gen-ohos"

Remove-Item -LiteralPath $jsFilePath -Force -Recurse
Remove-Item -LiteralPath $ohosFolder -Force -Recurse

Write-Host 'processing file :' $thriftFile

& $exe -v -r --gen $type $thriftFile

if (Test-Path -Path $jsFilePath) {
    Write-Host 'JS files generated ....!'
} else {
   Write-Host "error in generating thrift output ,check the input thrift file syntax !"
    Exit
}

if (!(Test-Path $ohosFolder -PathType Container)) {
   New-Item -ItemType Directory -Force -Path $ohosFolder
}

Copy-Item -Path $jsFilePath\* -Destination $ohosFolder -PassThru

cd $ohosFolder

ls *.js -rec | %{$f=$_; (gc $f.PSPath) | %{$_ -replace "^((?!(\s+|var))[a-zA-Z0-9_ ]*= .*)", 'var $1' } | sc $f.PSPath}

ls *.js -rec | %{$f=$_; (gc $f.PSPath) | %{$_ -replace "^(.*if\s*\(typeof Int64.*{)", '// $1 ' } | sc $f.PSPath}

ls *.js -rec | %{$f=$_; (gc $f.PSPath) | %{$_ -replace "^(.*var\s*Int64.*)", "//$1 `n{" } | sc $f.PSPath}

ls *.js -rec | %{$f=$_; (gc $f.PSPath) | %{$_ -replace "new Int64", "new int64 " } | sc $f.PSPath}

$files = Get-ChildItem $ohosFolder/*.js

 Foreach ($file in $files)
 {
     $outItems = New-Object System.Collections.Generic.List[System.Object]

     #Write-Host 'file  :'   $file.FullName
     "import {int64} from '@ohos/thrift' `n" + (Get-Content $file -Raw) | Set-Content $file
     "import {Thrift} from '@ohos/thrift' `n" + (Get-Content $file -Raw) | Set-Content $file

     $file | Select-String '^((var[a-zA-Z0-9_ ]*= .*))' -AllMatches | ForEach-Object { 
     $export = $_.Matches | Select-Object Value    
     $outItems.Add(($export.value).ToString().split(" ")[1])
    }
    $csv =  $outItems -join ','

    Write-Host 'exports   :' $csv

    $var = -join("export {", $csv, "};");

    Add-Content $file $var

    Write-Host 'processing file  :' $file.BaseName   
    
    $outItems.ForEach({
            $item = $args[0].ToString()
            write-host 'checking export :' $item 
            $list =Get-ChildItem $ohosFolder/*.js -Recurse | Select-String $args[0].ToString() -List | Select Path

             Foreach ($path in $list) {
                  if ($path.Path -ne $file.FullName )  {
                    write-host 'checking export :' $item  ',find in :' $path
                    
                    $temp = -join("import {",  $item , "} from './",$file.BaseName,"'");
                    Write-Host 'adding :' $temp
                    
                    $file_ = Get-ChildItem $path.Path

                    $temp+"`n" + (Get-Content $file_ -Raw) | Set-Content $file_
                  }
             }

        
    })
       
 } 

cd ..

